package com.codegym.city.controller;

import com.codegym.city.model.City;
import com.codegym.city.model.Country;
import com.codegym.city.service.city.ICityService;
import com.codegym.city.service.country.ICountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.Optional;

@RestController
@RequestMapping("/city")
public class CityController {

    @Autowired
    private ICityService cityService;

    @Autowired
    private ICountryService countryService;

    @ModelAttribute("countries")
    public Iterable<Country> country() {
        return countryService.findAll();
    }

    @GetMapping
    public ResponseEntity<Iterable<City>> getAllCity() {
        return new ResponseEntity<>(cityService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/list")
    public ModelAndView listCity() {
        ModelAndView modelAndView = new ModelAndView("/list");
        modelAndView.addObject("cities",cityService.findAll());
        return modelAndView;
    }

    @GetMapping("/api/{id}")
    public ResponseEntity<City> showApi(@PathVariable long id){
        Optional<City> cityOptional = cityService.findById(id);
        return new ResponseEntity<>(cityOptional.get(),HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<City> createCity(@RequestBody City city ) {
        city.getCountry().setName(countryService.findById(city.getCountry().getId()).get().getName());
        return new ResponseEntity<>(cityService.save(city), HttpStatus.CREATED);
    }

    @PostMapping("/edit/{id}")
    public ResponseEntity<City> cityResponseEntity(@RequestBody City city,@PathVariable Long id){
        city.setId(id);
        city.getCountry().setName(countryService.findById(city.getCountry().getId()).get().getName());
        return new ResponseEntity<>(cityService.save(city),HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<City> deleteCity(@PathVariable Long id) {
        Optional<City> cityOptional = cityService.findById(id);
        cityService.remove(id);
        return new ResponseEntity<>(cityOptional.get(), HttpStatus.NO_CONTENT);
    }

}
