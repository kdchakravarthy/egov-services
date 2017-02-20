package org.egov.workflow.service;


import org.egov.workflow.web.contract.ProcessInstance;

public interface Workflow {

    ProcessInstance start(String jurisdiction, ProcessInstance processInstance);
    
    ProcessInstance end(String jurisdiction, ProcessInstance processInstance);

   // ProcessInstance getProcess(String jurisdiction, ProcessInstance processInstance);

    //List<Task> getTasks(String jurisdiction, ProcessInstance processInstance);

    //ProcessInstance update(String jurisdiction, ProcessInstance processInstance);

    //Task update(String jurisdiction, Task task);

   // List<Task> getHistoryDetail(String workflowId);

  //  List<Designation> getDesignations(Task t, String departmentCode);

    //List<Object> getAssignee(String deptCode, String designationName);
    
    Object getAssignee(Long locationId, String complaintTypeId, Long assigneeId);
}