Drop table if exists egwtr_donation;

Drop SEQUENCE if exists seq_donation;

---Donation Master
CREATE TABLE egwtr_donation
(
 id bigint NOT NULL,
  propertytypeid character varying(50) NOT NULL,
  usagetypeid character varying(50) NOT NULL,
  categorytypeid bigint NOT NULL,
  maxpipesizeid bigint NOT NULL,
  minpipesizeid bigint NOT NULL,
  fromdate date,
  todate date,
  donationamount double precision NOT NULL,
  active boolean NOT NULL,
  createddate timestamp without time zone ,
  lastmodifieddate timestamp without time zone,
  createdby bigint,
  lastmodifiedby bigint,
  tenantid CHARACTER VARYING(250) NOT NULL,
  version numeric DEFAULT 0,
  CONSTRAINT pk_donation PRIMARY KEY (id,tenantid),
   CONSTRAINT fk_maxpipesizeid FOREIGN KEY (maxpipesizeid,tenantid) REFERENCES egwtr_pipesize (id,tenantid) ,
   CONSTRAINT fk_minpipesizeid FOREIGN KEY (minpipesizeid,tenantid) REFERENCES egwtr_pipesize (id,tenantid) ,
   CONSTRAINT fk_categorytypeid FOREIGN KEY (categorytypeid, tenantid) references egwtr_category (id, tenantid) 
  );
  
  CREATE SEQUENCE seq_egwtr_donation;