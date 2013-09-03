define(["js/common.js"],
       function(common) {

           var url_list="http://localhost:3000/zendesk";

           var result={};
           
           result.dao=function(data_state, callback){
               $('body').append("zendesk dao mock!!");
               var dao_object=data_state.dao;
               if(dao_object.action==url_list)
                   if(dao_object.data.operation=="users")
                       dao_object.result={
                           "users": [
                               {
                                   "id": 452912858,
                                   "url": "https://enterprisewebcom.zendesk.com/api/v2/users/452912858.json",
                                   "name": "Juan Antonio Ruz Velasco",
                                   "created_at": "2013-08-26T15:59:31Z",
                                   "updated_at": "2013-08-27T15:47:54Z",
                                   "time_zone": "Athens",
                                   "email": "juanantonioruz@gmail.com",
                                   "phone": null,
                                   "photo": null,
                                   "locale_id": 1,
                                   "locale": "en-US",
                                   "organization_id": 28070998,
                                   "role": "admin",
                                   "verified": true,
                                   "external_id": null,
                                   "tags": [],
                                   "alias": "",
                                   "active": true,
                                   "shared": false,
                                   "shared_agent": false,
                                   "last_login_at": "2013-08-30T14:50:30Z",
                                   "signature": "",
                                   "details": "",
                                   "notes": "",
                                   "custom_role_id": null,
                                   "moderator": true,
                                   "ticket_restriction": null,
                                   "only_private_comments": false,
                                   "restricted_agent": false,
                                   "suspended": false,
                                   "user_fields": {}
                               },
                               {
                                   "id": 454098268,
                                   "url": "https://enterprisewebcom.zendesk.com/api/v2/users/454098268.json",
                                   "name": "nuuevo",
                                   "created_at": "2013-08-27T20:08:56Z",
                                   "updated_at": "2013-08-27T20:08:56Z",
                                   "time_zone": "Athens",
                                   "email": "enjava@enjava.com",
                                   "phone": null,
                                   "photo": null,
                                   "locale_id": null,
                                   "locale": "es",
                                   "organization_id": 28070998,
                                   "role": "end-user",
                                   "verified": false,
                                   "external_id": null,
                                   "tags": [],
                                   "alias": null,
                                   "active": true,
                                   "shared": false,
                                   "shared_agent": false,
                                   "last_login_at": null,
                                   "signature": null,
                                   "details": null,
                                   "notes": null,
                                   "custom_role_id": null,
                                   "moderator": false,
                                   "ticket_restriction": "requested",
                                   "only_private_comments": false,
                                   "restricted_agent": true,
                                   "suspended": false,
                                   "user_fields": {}
                               },
                               {
                                   "id": 454308033,
                                   "url": "https://enterprisewebcom.zendesk.com/api/v2/users/454308033.json",
                                   "name": "macmini",
                                   "created_at": "2013-08-27T18:54:11Z",
                                   "updated_at": "2013-08-27T18:55:59Z",
                                   "time_zone": "Athens",
                                   "email": "macmini@enjava.com",
                                   "phone": null,
                                   "photo": null,
                                   "locale_id": null,
                                   "locale": "es",
                                   "organization_id": 28070998,
                                   "role": "admin",
                                   "verified": false,
                                   "external_id": null,
                                   "tags": [],
                                   "alias": "",
                                   "active": true,
                                   "shared": false,
                                   "shared_agent": false,
                                   "last_login_at": null,
                                   "signature": "",
                                   "details": "",
                                   "notes": "",
                                   "custom_role_id": null,
                                   "moderator": true,
                                   "ticket_restriction": null,
                                   "only_private_comments": false,
                                   "restricted_agent": false,
                                   "suspended": false,
                                   "user_fields": {}
                               },
                               {
                                   "id": 454402676,
                                   "url": "https://enterprisewebcom.zendesk.com/api/v2/users/454402676.json",
                                   "name": "juanBis",
                                   "created_at": "2013-08-27T18:49:52Z",
                                   "updated_at": "2013-08-27T18:51:30Z",
                                   "time_zone": "Athens",
                                   "email": "info@enjava.com",
                                   "phone": null,
                                   "photo": null,
                                   "locale_id": null,
                                   "locale": "es",
                                   "organization_id": 28070998,
                                   "role": "end-user",
                                   "verified": false,
                                   "external_id": null,
                                   "tags": [],
                                   "alias": "",
                                   "active": true,
                                   "shared": false,
                                   "shared_agent": false,
                                   "last_login_at": null,
                                   "signature": null,
                                   "details": "",
                                   "notes": "",
                                   "custom_role_id": null,
                                   "moderator": false,
                                   "ticket_restriction": "requested",
                                   "only_private_comments": false,
                                   "restricted_agent": true,
                                   "suspended": false,
                                   "user_fields": {}
                               },
                               {
                                   "id": 454456206,
                                   "url": "https://enterprisewebcom.zendesk.com/api/v2/users/454456206.json",
                                   "name": "Roger Wi",
                                   "created_at": "2013-08-27T20:05:54Z",
                                   "updated_at": "2013-08-29T10:43:52Z",
                                   "time_zone": "Athens",
                                   "email": "elmio@elmio.com",
                                   "phone": "23452345",
                                   "photo": null,
                                   "locale_id": null,
                                   "locale": "es",
                                   "organization_id": null,
                                   "role": "end-user",
                                   "verified": false,
                                   "external_id": null,
                                   "tags": [],
                                   "alias": null,
                                   "active": true,
                                   "shared": false,
                                   "shared_agent": false,
                                   "last_login_at": null,
                                   "signature": null,
                                   "details": null,
                                   "notes": null,
                                   "custom_role_id": null,
                                   "moderator": false,
                                   "ticket_restriction": "requested",
                                   "only_private_comments": false,
                                   "restricted_agent": true,
                                   "suspended": false,
                                   "user_fields": {}
                               },
                               {
                                   "id": 455709453,
                                   "url": "https://enterprisewebcom.zendesk.com/api/v2/users/455709453.json",
                                   "name": "changing the data in form",
                                   "created_at": "2013-08-29T10:58:35Z",
                                   "updated_at": "2013-08-29T10:58:59Z",
                                   "time_zone": "Athens",
                                   "email": "nuevo@nuevo.com",
                                   "phone": "the new number",
                                   "photo": null,
                                   "locale_id": null,
                                   "locale": "es",
                                   "organization_id": null,
                                   "role": "end-user",
                                   "verified": false,
                                   "external_id": null,
                                   "tags": [],
                                   "alias": null,
                                   "active": true,
                                   "shared": false,
                                   "shared_agent": false,
                                   "last_login_at": null,
                                   "signature": null,
                                   "details": null,
                                   "notes": null,
                                   "custom_role_id": null,
                                   "moderator": false,
                                   "ticket_restriction": "requested",
                                   "only_private_comments": false,
                                   "restricted_agent": true,
                                   "suspended": false,
                                   "user_fields": {}
                               }
                           ],
                           "next_page": null,
                           "previous_page": null,
                           "count": 6
                       };
               else if(dao_object.data.operation=="organizations")
                   dao_object.result={
                       "organizations": [
                           {
                               "url": "https://enterprisewebcom.zendesk.com/api/v2/organizations/28070998.json",
                               "id": 28070998,
                               "name": "enterpriseweb.com",
                               "shared_tickets": false,
                               "shared_comments": false,
                               "external_id": null,
                               "created_at": "2013-08-26T15:59:31Z",
                               "updated_at": "2013-08-27T18:53:51Z",
                               "domain_names": [
                                   "enjava.com"
                               ],
                               "details": "",
                               "notes": "",
                               "group_id": null,
                               "tags": [],
                               "organization_fields": {}
                           }
                       ],
                       "next_page": null,
                       "previous_page": null,
                       "count": 1
                   };
               callback(null, data_state);
           };
           result.show_result=function(data_state, callback){
               callback(null, data_state);
           };
           return common.naming_fns(result);
       }
      );