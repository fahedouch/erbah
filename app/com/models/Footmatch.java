package com.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the footmatch database table.
 * 
 */
@Entity
@NamedQuery(name="Footmatch.findAll", query="SELECT f FROM Footmatch f")
public class Footmatch implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="match_id")
	private int matchId;

	@Column(name="match_date_end")
	private String matchDateEnd;

	@Column(name="match_date_start")
	private String matchDateStart;

	//bi-directional many-to-one association to Tournement
	@ManyToOne
	@JoinColumn(name="tournement_id")
	private Tournement tournement;

	//bi-directional many-to-many association to User
	@ManyToMany(mappedBy="footmatches")
	private List<User> users;

	//bi-directional many-to-one association to UserFootmatch
	@OneToMany(mappedBy="footmatch")
	private List<UserFootmatch> userFootmatches;

	public Footmatch() {
	}

	public int getMatchId() {
		return this.matchId;
	}

	public void setMatchId(int matchId) {
		this.matchId = matchId;
	}

	public String getMatchDateEnd() {
		return this.matchDateEnd;
	}

	public void setMatchDateEnd(String matchDateEnd) {
		this.matchDateEnd = matchDateEnd;
	}

	public String getMatchDateStart() {
		return this.matchDateStart;
	}

	public void setMatchDateStart(String matchDateStart) {
		this.matchDateStart = matchDateStart;
	}

	public Tournement getTournement() {
		return this.tournement;
	}

	public void setTournement(Tournement tournement) {
		this.tournement = tournement;
	}

	public List<User> getUsers() {
		return this.users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public List<UserFootmatch> getUserFootmatches() {
		return this.userFootmatches;
	}

	public void setUserFootmatches(List<UserFootmatch> userFootmatches) {
		this.userFootmatches = userFootmatches;
	}

	public UserFootmatch addUserFootmatch(UserFootmatch userFootmatch) {
		getUserFootmatches().add(userFootmatch);
		userFootmatch.setFootmatch(this);

		return userFootmatch;
	}

	public UserFootmatch removeUserFootmatch(UserFootmatch userFootmatch) {
		getUserFootmatches().remove(userFootmatch);
		userFootmatch.setFootmatch(null);

		return userFootmatch;
	}

}