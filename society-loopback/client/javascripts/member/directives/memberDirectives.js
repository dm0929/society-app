define([
    'angular',
    'lodash',
    'javascripts/member/filters/memberFilters',
    'javascripts/member/directives/memberSearch',
    'javascripts/member/directives/memberDirective.memberDetails',
    'javascripts/member/directives/memberDirective.memberDocument',
    'javascripts/member/directives/memberDirective.memberDeposit',
    'javascripts/member/directives/memberDirective.memberLoans',
    'javascripts/member/directives/memberDirective.transactionHistory',
    'javascripts/member/directives/memberDirective.nomineeDetails'
], function (angular, _) {
    angular.module("societyApp.member.directives",
        [
            "societyApp.member.filters",
            "societyApp.member.memberSearchDirective",
            "societyApp.member.directives.memberDetails",
            "societyApp.member.directives.memberDocument",
            "societyApp.member.directives.memberDeposit",
            "societyApp.member.directives.memberLoans",
            "societyApp.member.directives.transactionHistory",
            "societyApp.member.directives.memberNominee"
        ]);
});
