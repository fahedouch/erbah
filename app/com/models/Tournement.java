package com.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the tournement database table.
 * 
 */
@Entity
@NamedQuery(name="Tournement.findAll", query="SELECT t FROM Tournement t")
public class Tournement implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="tournement_id")
	private int tournementId;

	@Column(name="tournement_date_end")
	private String tournementDateEnd;

	@Column(name="tournement_date_start")
	private String tournementDateStart;

	//bi-directional many-to-one association to Footmatch
    @JsonIgnore
	@OneToMany(mappedBy="tournement")
	private List<Footmatch> footmatches;

	//bi-directional many-to-many association to User
    @JsonIgnore
	@ManyToMany(mappedBy="tournements")
	private List<User> users;

	//bi-directional many-to-one association to UserTournement
	@OneToMany(mappedBy="tournement")
	private List<UserTournement> userTournements;

	public Tournement() {
	}

	public int getTournementId() {
		return this.tournementId;
	}

	public void setTournementId(int tournementId) {
		this.tournementId = tournementId;
	}

	public String getTournementDateEnd() {
		return this.tournementDateEnd;
	}

	public void setTournementDateEnd(String tournementDateEnd) {
		this.tournementDateEnd = tournementDateEnd;
	}

	public String getTournementDateStart() {
		return this.tournementDateStart;
	}

	public void setTournementDateStart(String tournementDateStart) {
		this.tournementDateStart = tournementDateStart;
	}

	public List<Footmatch> getFootmatches() {
		return this.footmatches;
	}

	public void setFootmatches(List<Footmatch> footmatches) {
		this.footmatches = footmatches;
	}

	public Footmatch addFootmatch(Footmatch footmatch) {
		getFootmatches().add(footmatch);
		footmatch.setTournement(this);

		return footmatch;
	}

	public Footmatch removeFootmatch(Footmatch footmatch) {
		getFootmatches().remove(footmatch);
		footmatch.setTournement(null);

		return footmatch;
	}

	public List<User> getUsers() {
		return this.users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public List<UserTournement> getUserTournements() {
		return this.userTournements;
	}

	public void setUserTournements(List<UserTournement> userTournements) {
		this.userTournements = userTournements;
	}

	public UserTournement addUserTournement(UserTournement userTournement) {
		getUserTournements().add(userTournement);
		userTournement.setTournement(this);

		return userTournement;
	}

	public UserTournement removeUserTournement(UserTournement userTournement) {
		getUserTournements().remove(userTournement);
		userTournement.setTournement(null);

		return userTournement;
	}

}