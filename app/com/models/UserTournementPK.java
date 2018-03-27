package com.models;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The primary key class for the user_tournement database table.
 * 
 */
@Embeddable
public class UserTournementPK implements Serializable {
	//default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;

	@Column(name="user_id", insertable=false, updatable=false)
	private int userId;

	@Column(name="tournement_id", insertable=false, updatable=false)
	private int tournementId;

	public UserTournementPK() {
	}
	public int getUserId() {
		return this.userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public int getTournementId() {
		return this.tournementId;
	}
	public void setTournementId(int tournementId) {
		this.tournementId = tournementId;
	}

	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof UserTournementPK)) {
			return false;
		}
		UserTournementPK castOther = (UserTournementPK)other;
		return 
			(this.userId == castOther.userId)
			&& (this.tournementId == castOther.tournementId);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.userId;
		hash = hash * prime + this.tournementId;
		
		return hash;
	}
}