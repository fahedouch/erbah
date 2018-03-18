package com.models;

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

	//bi-directional many-to-one association to Match
	@OneToMany(mappedBy="tournement")
	private List<Match> matches;

	//bi-directional many-to-one association to Ranking
	@OneToMany(mappedBy="tournement")
	private List<Ranking> rankings;

	//bi-directional many-to-many association to User
	@ManyToMany(mappedBy="tournements")
	private List<User> users;

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

	public List<Match> getMatches() {
		return this.matches;
	}

	public void setMatches(List<Match> matches) {
		this.matches = matches;
	}

	public Match addMatch(Match match) {
		getMatches().add(match);
		match.setTournement(this);

		return match;
	}

	public Match removeMatch(Match match) {
		getMatches().remove(match);
		match.setTournement(null);

		return match;
	}

	public List<Ranking> getRankings() {
		return this.rankings;
	}

	public void setRankings(List<Ranking> rankings) {
		this.rankings = rankings;
	}

	public Ranking addRanking(Ranking ranking) {
		getRankings().add(ranking);
		ranking.setTournement(this);

		return ranking;
	}

	public Ranking removeRanking(Ranking ranking) {
		getRankings().remove(ranking);
		ranking.setTournement(null);

		return ranking;
	}

	public List<User> getUsers() {
		return this.users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

}