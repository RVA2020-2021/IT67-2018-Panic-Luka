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


import rva.jpa.TipRacuna;
import rva.repository.TipRacunaRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@CrossOrigin
@RestController
@Api(tags = {"TipRačuna CRUD operacije"})
public class TipRacunaRestController {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private TipRacunaRepository tipRacunaRepository;
	
	@GetMapping("tipRacuna")
	@ApiOperation(value = "Vraća kolekciju svih tipova računa iz baze podataka")
	public Collection<TipRacuna> getTipoviRacuna(){
		
		return tipRacunaRepository.findAll();
		
	}
	
	@GetMapping("tipRacuna/{id}")
	@ApiOperation(value = "Vraća tip računa iz baze podataka cija je id vrednost prosledjena kao path varijabla")
	public TipRacuna getTipRacun(@PathVariable("id") Integer id) {
		
		return tipRacunaRepository.getOne(id);
	}
	
	@GetMapping("tipRacunaNaziv/{naziv}")
	@ApiOperation(value = "Vraća tip računa iz baze podataka čija je vrednost naziva prosledjena kao path varijabla")
	public Collection<TipRacuna> getTipRacunaByNaziv(@PathVariable("naziv") String naziv){
		return tipRacunaRepository.findByNazivContainingIgnoreCase(naziv);
	}

	@PostMapping("tipRacuna")
	@ApiOperation(value = "Upisuje tip računa u bazu podataka")
	public ResponseEntity<TipRacuna> insertTipRacuna(@RequestBody TipRacuna tipRacuna){
		if(!tipRacunaRepository.existsById(tipRacuna.getId())) {
			tipRacunaRepository.save(tipRacuna);
			return new ResponseEntity<TipRacuna>(HttpStatus.OK);
		}
			return new ResponseEntity<TipRacuna>(HttpStatus.CONFLICT);
		
	}
	
	@PutMapping("tipRacuna")
	@ApiOperation(value = "Modifikuje postojeći tip računa u bazi podataka")
	public ResponseEntity<TipRacuna> updateTipRacuna(@RequestBody TipRacuna tipRacuna){
		if(!tipRacunaRepository.existsById(tipRacuna.getId())) {
			return new ResponseEntity<TipRacuna>(HttpStatus.NO_CONTENT);	
			}
		
		tipRacunaRepository.save(tipRacuna);
		return new ResponseEntity<TipRacuna>(HttpStatus.OK);
	}
	
	@DeleteMapping("tipRacuna/{id}")
	@ApiOperation(value = "Briše tip računa iz baze podataka čija je id vrednost prosledjena kao path varijabla")
	public ResponseEntity<TipRacuna> deleteTipRacuna(@PathVariable("id") Integer id){
		if(!tipRacunaRepository.existsById(id)) {
			return new ResponseEntity<TipRacuna>(HttpStatus.NO_CONTENT);	

		}
		tipRacunaRepository.deleteById(id);
		tipRacunaRepository.flush();
		if(id == -100)
		{
			jdbcTemplate.execute(
					"INSERT INTO \"tip_racuna\"(\"id\", \"naziv\", \"oznaka\", \"opis\") "
					+ "VALUES(-100, 'bilo koji racun', 'Had', 'nameski hacak')"
					);
		}
		return new ResponseEntity<TipRacuna>(HttpStatus.OK);
		
	}
	
	
	
	
}
