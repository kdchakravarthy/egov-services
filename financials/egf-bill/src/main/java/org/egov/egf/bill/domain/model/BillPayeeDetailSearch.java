package org.egov.egf.bill.domain.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BillPayeeDetailSearch extends BillPayeeDetail {
    private String ids;
    private String sortBy;
    private Integer pageSize;
    private Integer offset;
}