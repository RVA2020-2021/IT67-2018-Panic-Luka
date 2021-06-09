package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import rva.jpa.Klijent;
import rva.jpa.Racun;
import rva.jpa.TipRacuna;
import rva.repository.RacunRepository;
import rva.repository.KlijentRepository;
import rva.repository.TipRacunaRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@CrossOrigin
@RestController
@Api(tags = {"Račun CRUD operacije"})
public class RacunRestController {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	
	@Autowired
	private RacunRepository racunRepository;
	
	@Autowired
	private KlijentRepository klijentRepository;
	
	@GetMapping("racun")
	@ApiOperation(value = "Vraća kolekciju svih računa iz baze podataka")
	public Collection<Racun> getRacuni(){
		
		return racunRepository.findAll();
		
	}
	
	@GetMapping("racunId/{id}")
	@ApiOperation(value = "Vraća račun iz baze podataka cija je id vrednost prosledjena kao path varijabla")
	public Racun getRacun(@PathVariable("id") Integer id) {
		
		return racunRepository.getOne(id);
	}
	
	@GetMapping("racunKlijenta/{id}")
	@ApiOperation(value = "Vraća račun iz baze podataka za prosledjenu id vrednost klijenta")
	public Collection<Racun> racuniKlijenta(@PathVariable("id") Integer id){
		Klijent k = klijentRepository.getOne(id);
		return racunRepository.findByKlijent(k);
	}
	
	
	
	@GetMapping("racun/{naziv}")
	@ApiOperation(value = "Vraća kredit iz baze podataka čija je vrednost naziva prosledjena kao path varijabla")
	public Collection<Racun> getRacunByNaziv(@PathVariable("naziv") String naziv){
		return racunRepository.findByNazivContainingIgnoreCase(naziv);
	}

	@PostMapping("racun")
	@ApiOperation(value = "Upisuje račun u bazu podataka")
	public ResponseEntity<Racun> insertRacun(@RequestBody Racun racun){
		if(!racunRepository.existsById(racun.getId())) {
			racunRepository.save(racun);
			return new ResponseEntity<Racun>(HttpStatus.OK);
		}
			return new ResponseEntity<Racun>(HttpStatus.CONFLICT);
		
	}
	
	@PutMapping("racun")
	@ApiOperation(value = "Modifikuje postojeći račun u bazi podataka")
	public ResponseEntity<Racun> updateRacun(@RequestBody Racun racun){
		if(!racunRepository.existsById(racun.getId())) {
			return new ResponseEntity<Racun>(HttpStatus.NO_CONTENT);	
			}
		
		racunRepository.save(racun);
		return new ResponseEntity<Racun>(HttpStatus.OK);
	}
	
	@DeleteMapping("racun/{id}")
	@ApiOperation(value = "Briše račun iz baze podataka čija je vrednost prosledjena kao path varijabla")
	public ResponseEntity<Racun> deleteRacun(@PathVariable("id") Integer id){
		if(!racunRepository.existsById(id)) {
			return new ResponseEntity<Racun>(HttpStatus.NO_CONTENT);	

		}
		racunRepository.deleteById(id);
		racunRepository.flush();
		if(id == -100) {
			jdbcTemplate.execute(
					"INSERT INTO racun(\"id\", \"naziv\", \"oznaka\", \"opis\", \"tip_racuna\", \"klijent\" )"
					+ "VALUES(-100, 'Platni', 'P', 'Platni racun', 2, 3)"
					
					);
		}
		return new ResponseEntity<Racun>(HttpStatus.OK);
		
	}
	
	
	
	
}