define([
    'angular',
    'javascripts/member/services/Member',
    'javascripts/member/directives/memberDirectives'
], function () {
    angular.module("societyApp.member.controller.memberregistration",
        ["societyApp.member.services.member",
            "societyApp.member.directives"])
        .controller('memberRegistrationController',
        ['$scope', 'MemberService', '$location', '$routeParams', '$filter',
            function ($scope, MemberService, $location, $routeParams, $filter) {

                var VIEW_MODE = {
                    NEW: 1,
                    VIEW: 2,
                    EDIT: 3
                };
                /*
                 * Default deposit tab object
                 * */
                $scope.memberDeposit = {};
                /*
                 * Default transaction history tab object
                 * */
                $scope.transactionHistory = {
                    data: '',
                    dateRange: {
                        startDate: '',
                        endDate: ''
                    }
                };
                /*
                 * @method
                 * @name updateMemberDetail
                 * to update existing member OR add new member
                 * */
                function updateMemberDetail(form, type) {
                    function successCB() {
                        $location.url('/member');
                    }

                    function errorCB() {
                    }

                    $scope.member.person.dob = $filter('date')($scope.member.person.dob, 'yyyy-MM-dd');
                    if (type === 'update') {
                        MemberService.updateMember($scope.member).then(successCB, errorCB);
                    } else {
                        $scope.member.createDate = $filter('date')(new Date(), 'yyyy-MM-dd');
                        MemberService.addMember($scope.member).then(successCB, errorCB);
                    }
                }

                /*
                 * @method
                 * @name resetRegistrationForm
                 * reset the form on new mode
                 * */
                function initRegistrationFormNewMode() {
                    //Default member
                    $scope.member = MemberService.defaultMember({});
                    //Default address
                    $scope.member.person.address = MemberService.defaultMemberAddress({});
                    //header texts
                    $scope.primaryHeaderText = 'New Member Registration';
                    $scope.secondaryHeaderText = '';
                    $scope.formValidationInfoText = 'Please fill all required fields marked with *.';
                    $scope.actionText = 'Register';
                    $scope.mode = VIEW_MODE.NEW;
                    $scope.isViewMode = false;
                }

                /*
                 * @method
                 * @name initRegistrationFormViewMode
                 * initialize the form in view mode with all data
                 * */
                function initRegistrationFormViewMode(memberId) {
                    MemberService.getMemberDetail(memberId).then(function (data) {
                        $scope.primaryHeaderText = 'Member Details';
                        $scope.secondaryHeaderText = 'To edit member details, click on edit button.';
                        $scope.formValidationInfoText = '';
                        $scope.actionText = 'Edit';
                        $scope.member = MemberService.defaultMember(data);
                        $scope.member.person.address = MemberService.defaultMemberAddress(data.person.address);
                        $scope.member.person.dob = new Date(data.person.dob);
                        $scope.memberFullName = data.fname+' '+data.mname+' '+data.lname;
                        $scope.memberDeposit = angular.merge({}, $scope.memberDeposit, data.memberDeposit);
                        $scope.memberDeposit.deposit = data.deposit;
                        $scope.isViewMode = true;
                        $scope.mode = VIEW_MODE.VIEW;
                    })
                }

                /*
                 * @method
                 * @name initRegistrationFormEditMode
                 * */
                function initRegistrationFormEditMode() {
                    $scope.mode = VIEW_MODE.EDIT;
                    $scope.isViewMode = false;
                    $scope.primaryHeaderText = 'Edit Member Details';
                    $scope.secondaryHeaderText = '';
                    $scope.formValidationInfoText = 'Please fill all required fields marked with *.';
                    $scope.actionText = 'Update';
                }

                /*
                 * @method
                 * @name init
                 * initialization, view or new mode
                 * */
                function init() {
                    var action = $routeParams.action,
                        id = $routeParams.id;
                    switch (action) {
                        case 'view':
                            initRegistrationFormViewMode(id);
                            break;
                        case 'registration':
                            initRegistrationFormNewMode();
                            break;
                    }
                }

                /*
                 * Get all transaction history if a member based on id, start date, end data
                 * */
                $scope.getTransactionHistory = function () {
                    MemberService.getTransactionHistory($scope.member.id).then(function (data) {
                        $scope.transactionHistory.successCB(data);
                    }, function (error) {
                        $scope.transactionHistory.errorCB(error);
                    });
                };
                /*
                 * Reset the deposit tab on change or click
                 * */
                $scope.resetDepositTab = function () {
                    $scope.memberDeposit.reset();
                };
                /*
                 * Save a new deposit entry of a member
                 * */
                $scope.saveNewDeposit = function (transaction) {
                    transaction.createDate = $filter('date')(new Date(), 'yyyy-MM-dd');
                    transaction.memberId = $scope.member.id;
                    transaction.depositAmount = Number(transaction.depositAmount);
                    MemberService.addNewTransaction(transaction).then(function (data) {
                        $scope.memberDeposit.deposit = data.transaction.deposit;
                        $scope.memberDeposit.successCB();
                    }, function (error) {
                        $scope.memberDeposit.errorCB(error);
                    })
                };
                $scope.register = function register(form) {
                    switch ($scope.mode) {
                        case VIEW_MODE.VIEW:
                            initRegistrationFormEditMode();
                            break;
                        case VIEW_MODE.NEW:
                            updateMemberDetail(form, 'new');
                            break;
                        case VIEW_MODE.EDIT:
                            updateMemberDetail(form, 'update');
                            break;
                    }
                };
                /*
                 * Initialize on load
                 * */
                init();
            }]);
});