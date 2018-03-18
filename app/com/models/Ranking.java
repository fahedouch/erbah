package com.models;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the ranking database table.
 * 
 */
@Entity
@NamedQuery(name="Ranking.findAll", query="SELECT r FROM Ranking r")
public class Ranking implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="ranking_id")
	private int rankingId;

	//bi-directional many-to-one association to Tournement
	@ManyToOne
	@JoinColumn(name="tournement_id")
	private Tournement tournement;

	//bi-directional many-to-many association to User
	@ManyToMany(mappedBy="rankings")
	private List<User> users;

	public Ranking() {
	}

	public int getRankingId() {
		return this.rankingId;
	}

	public void setRankingId(int rankingId) {
		this.rankingId = rankingId;
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

}