package com.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the club database table.
 * 
 */
@Entity
@NamedQuery(name="Club.findAll", query="SELECT c FROM Club c")
public class Club implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="club_id")
	private int clubId;

	@Column(name="club_name")
	private String clubName;

	//bi-directional many-to-one association to Tournement
    @JsonIgnore
	@OneToMany(mappedBy="club")
	private List<Tournement> tournements;

	//bi-directional many-to-one association to User
    @JsonIgnore
	@OneToMany(mappedBy="club")
	private List<User> users;

	public Club() {
	}

	public int getClubId() {
		return this.clubId;
	}

	public void setClubId(int clubId) {
		this.clubId = clubId;
	}

	public String getClubName() {
		return this.clubName;
	}

	public void setClubName(String clubName) {
		this.clubName = clubName;
	}

	public List<Tournement> getTournements() {
		return this.tournements;
	}

	public void setTournements(List<Tournement> tournements) {
		this.tournements = tournements;
	}

	public Tournement addTournement(Tournement tournement) {
		getTournements().add(tournement);
		tournement.setClub(this);

		return tournement;
	}

	public Tournement removeTournement(Tournement tournement) {
		getTournements().remove(tournement);
		tournement.setClub(null);

		return tournement;
	}

	public List<User> getUsers() {
		return this.users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public User addUser(User user) {
		getUsers().add(user);
		user.setClub(this);

		return user;
	}

	public User removeUser(User user) {
		getUsers().remove(user);
		user.setClub(null);

		return user;
	}

}