package rest.service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import entities.Person;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@Path("person")
public class PersonRessource {
public static Person person1 = new Person("Brian Sandberg");
public static Person person2 = new Person("Jørgen Ostemad");
public static List<Person> people = new ArrayList();
public static List<Integer> ID = new ArrayList();
private static final Gson GSON = new GsonBuilder().setPrettyPrinting().create();


    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public String demo() {
        people.add(person1);
        people.add(person2);
        HashMap map;
        map = new HashMap();
        map.put("everybody", people);
        return GSON.toJson(map);
    }
    
    @Path("{id}")
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public String getPersonbyID(@PathParam("id") Long id) {
        Person person = null;
        for (Person _person : people) {
            if (_person.getId() == id) {
                person = _person;
            }
        }
        return GSON.toJson(person);
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response PostPerson(String p) {
        Person person = GSON.fromJson(p, Person.class);
        person.setId(ID.size()+1);
        ID.add(person.getId());
        people.add(person);
        return Response.ok(person).build();
    }
    
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response PutPerson(String p) {
        Person person = GSON.fromJson(p, Person.class);
        people.forEach((_person) -> {
            if (person.getId() == _person.getId()) {
                _person.setName(person.getName());
            }
        });
        return Response.ok(person).build();
    }
    
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    @Path("{id}")
    public String DeletePerson(@PathParam("id") int id) {
        people.forEach((person) -> {
            if (person.getId() == id) {
                people.remove(person);
            }
        });
        return "{\"person\":" + id + " \"removed\"}";

    }
}
