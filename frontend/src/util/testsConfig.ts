export function mockFetch(data: any) {
  return jest.spyOn(window, "fetch").mockResolvedValue(new Response(data));
}

export const mockData = {
  users: [
    {
      username: "admin",
      password: "123",
      name: "Admin",
      isAdmin: true,
      id: 1,
    },
    {
      username: "user",
      password: "123",
      name: "Ali Mohammed",
      isAdmin: false,
      id: 2,
    },
  ],
  careers: [
    {
      id: 1,
      title: "Product Designer",
      subTitle: "Join our amazing team in Riyadh right now!",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus",
      skills: ["Brilliant", "Storyteller"],
      city: "Riyadh",
    },
    {
      id: 2,
      title: "Software Engineer",
      subTitle: "Join our amazing team in Dammam right now!",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus",
      skills: ["Creative", "Brilliant", "Storyteller"],
      city: "Dammam",
    },
  ],
  applications: [
    {
      userId: 2,
      careerId: 1,
      resume: {
        name: "ID.jpg",
        type: "image/jpeg",
        content: "base64:file_content",
      },
      files: [],
      skills: [],
      id: 1,
      status: "Created",
      user: {
        username: "user",
        password: "123",
        name: "Ali Mohammed",
        isAdmin: false,
        id: 2,
      },
      career: {
        id: 1,
        title: "Product Designer",
        subTitle: "Join our amazing team in Riyadh right now!",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus",
        skills: ["Brilliant", "Storyteller"],
        city: "Riyadh",
      },
    },
  ],
  evaluations: [
    {
      application: {
        userId: 2,
        careerId: 1,
        resume: {
          name: "Ahmed Alsinan.pdf",
          type: "application/pdf",
          content: "base64:content",
        },
        files: [],
        skills: ["Creative"],
        status: "Created",
        id: 1,
        user: {
          username: "user",
          password: "123",
          name: "Ali Mohammed",
          isAdmin: false,
          id: 2,
        },
        career: {
          id: 1,
          title: "Product Designer",
          subTitle: "Join our amazing team in Riyadh right now!",
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus",
          skills: ["Brilliant", "Storyteller"],
          city: "Riyadh",
        },
      },
      linkedIn: "https://www.linkedin.com/in/ahmed-alsinan/",
      score: 51,
    },
  ],
};
