package org.egov.collection.web.contract;


import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;
import org.joda.time.LocalDate;


@Setter
@Getter
@ToString
public class BillDetails   {
  private String businessDetailsCode;

  private String refNo;

  private LocalDate billDate;

  private String consumerCode;

  private String consumerType;

  private String billDescription;

  private Double minimumAmount;

  private Double totalAmount;

  private List<String> collectionModesNotAllowed = new ArrayList<String>();
  
  private String event;

  private String receiptNumber;

  private LocalDate receiptDate;

  private String channel;
  
  private String voucherHeader;
  
  private String receiptType;
  
  private String collectionType;
  
  private String fundSource;
  
  private String department;

  private String boundary;

  private String reasonForCancellation;
  
  @JsonProperty("Fund")
  private Fund fund;
  
  @JsonProperty("Function")
  private Function function;

  @JsonProperty("BillAccountDetails")
  private List<BillAccountDetails> billAccountDetails = new ArrayList<BillAccountDetails>();
}

