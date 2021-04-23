package rva.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import rva.jpa.Racun;
import rva.jpa.TipRacuna;

public interface RacunRepository extends JpaRepository<Racun, Integer> {
	
	Collection<Racun> findByTipRacuna(TipRacuna t);
	Collection<Racun> findByNazivContainingIgnoreCase(String naziv);
	
	
	
}