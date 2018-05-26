package com.models;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The primary key class for the user_footmatch database table.
 * 
 */
@Embeddable
public class UserFootmatchPK implements Serializable {
	//default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;

	@Column(name="user_id", insertable=false, updatable=false)
	private int userId;

	@Column(name="match_id", insertable=false, updatable=false)
	private int matchId;

	public UserFootmatchPK() {
	}
	public int getUserId() {
		return this.userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public int getMatchId() {
		return this.matchId;
	}
	public void setMatchId(int matchId) {
		this.matchId = matchId;
	}

	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof UserFootmatchPK)) {
			return false;
		}
		UserFootmatchPK castOther = (UserFootmatchPK)other;
		return 
			(this.userId == castOther.userId)
			&& (this.matchId == castOther.matchId);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.userId;
		hash = hash * prime + this.matchId;
		
		return hash;
	}
}