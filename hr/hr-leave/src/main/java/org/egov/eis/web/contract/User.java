package org.egov.eis.web.contract;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Set;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User {
    
    @JsonProperty("id")
    private Long id = null;

    @JsonProperty("userName")
    private String userName = null;

    @JsonProperty("name")
    private String name = null;

    @JsonProperty("roles")
    private Set<Role> roles = null;
    
    @JsonProperty("tenantId")
    private String tenantId;

}
