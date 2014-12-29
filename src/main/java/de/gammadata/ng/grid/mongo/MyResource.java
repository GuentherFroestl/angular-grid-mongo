package de.gammadata.ng.grid.mongo;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * Root resource (exposed at "myresource" path)
 */
@Path("myresource")
public class MyResource {

  /**
   * Method handling HTTP GET requests. The returned object will be sent to the client as "text/plain" media type.
   *
   * @return String that will be returned as a text/plain response.
   */
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public User getIt() {
    return new User("MyName", "MyFirstName", "MyNickName");
  }

  public static class User {

    private String name;
    private String firstName;
    private String nickName;

    public User(String name, String firstName, String nickName) {
      this.name = name;
      this.firstName = firstName;
      this.nickName = nickName;
    }

    public User() {
    }

    public String getName() {
      return name;
    }

    public void setName(String name) {
      this.name = name;
    }

    public String getFirstName() {
      return firstName;
    }

    public void setFirstName(String firstName) {
      this.firstName = firstName;
    }

    public String getNickName() {
      return nickName;
    }

    public void setNickName(String nickName) {
      this.nickName = nickName;
    }

  }
}
