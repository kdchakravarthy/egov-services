
insert into eg_roleaction(roleCode,actionid,tenantid)values('EMPLOYEE', (select id from eg_action where name = 'DesignationSearch'),'default');