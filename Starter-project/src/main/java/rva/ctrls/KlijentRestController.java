package rva.ctrls;

import java.util.Collection;

import javax.transaction.Transactional;

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
import rva.repository.KlijentRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@CrossOrigin
@RestController
@Api(tags = {"Klijent CRUD operacije"})
public class KlijentRestController {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	@Autowired
	private KlijentRepository klijentRepository;
	
	@GetMapping("klijent")
	@ApiOperation(value = "Vraća kolekciju svih klijenata iz baze podataka")
	public Collection<Klijent> getKlijenti(){
		
		return klijentRepository.findAll(); 
	}
	
	@GetMapping("klijent/{id}")
	@ApiOperation(value = "Vraća klijenta iz baze podataka cija je id vrednost prosledjena kao path varijabla")
	public Klijent getKlijent(@PathVariable("id") Integer id) {
		
		return klijentRepository.getOne(id);
	}
	
	@GetMapping("klijentIme/{ime}")
	@ApiOperation(value = "Vraća klijenta iz baze podataka čija je vrednost imena prosledjena kao path varijabla")
	public Collection<Klijent> getKlijentByIme(@PathVariable("ime") String ime){
		return klijentRepository.findByImeContainingIgnoreCase(ime);
	}
	
	@PostMapping("klijent")
	@ApiOperation(value = "Upisuje klijenta u bazu podataka")
	public ResponseEntity<Klijent> insertKlijent(@RequestBody Klijent klijent){
		if(!klijentRepository.existsById(klijent.getId())) {
			klijentRepository.save(klijent);
			return new ResponseEntity<Klijent>(HttpStatus.OK);
		}
		
		return new ResponseEntity<Klijent>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("klijent")
	@ApiOperation(value = "Modifikuje postojećeg klijenta u bazi podataka")
	public ResponseEntity<Klijent> updateKlijent(@RequestBody Klijent klijent){
		if(!klijentRepository.existsById(klijent.getId())) {
			return new ResponseEntity<Klijent>(HttpStatus.NO_CONTENT);	
			}
		
		klijentRepository.save(klijent);
		return new ResponseEntity<Klijent>(HttpStatus.OK);
	}
	
	@Transactional
	@DeleteMapping("klijent/{id}")
	@ApiOperation(value = "Briše klijenta iz baze podataka čija je vrednost prosledjena kao path varijabla")
	public ResponseEntity<Klijent> deleteKlijent(@PathVariable("id") Integer id){
		if(!klijentRepository.existsById(id)) {
			return new ResponseEntity<Klijent>(HttpStatus.NO_CONTENT);	

		}
		jdbcTemplate.execute("delete from racun where klijent = " + id);
		klijentRepository.deleteById(id);
		klijentRepository.flush();
		if(id == -100) {
			jdbcTemplate.execute(
					"INSERT INTO \"klijent\"(\"id\", \"ime\", \"prezime\", \"broj_lk\", \"kredit\" ) "
					+ "VALUES(-100, 'Nikola', 'Jankovic', '123456688', 4)"
					);
		}
		
		return new ResponseEntity<Klijent>(HttpStatus.OK);
		
	}
}
