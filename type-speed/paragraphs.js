const paragraphs = [
  "Technical designs build on conceptual designs and requirements to define the technical details of the solution. In the conceptual design, the major components and connections as well as their associated responsibilities of the software being developed are outlined.The technical design brings this information to the next stage—it aims to describe how these responsibilities are met",
  "The technical design is not finished until each component has been refined to be specific enough to be designed in detail.Technical designs begin by splitting components into smaller and smaller components that are specific enough to be designed in detail.By breaking down components, each with specific responsibilities, you get down to a level where you can do a detailed design of a particular components The final result is that each component will have their technical details specified.",
  "Context provides important information when deciding on the balance of qualities in design.For example, software that stores personal information, which the public can access, may have different security requirements than software that is only used by corporate employees.In order to establih context, it is important to talk to stakeholders.Software design also must consider the consequences. Sometimes, choices made in software design have unintended consequences.For example, an idea that seems to work fine for a small amount of data may be impractical for large amounts of data",
  "Coupling focuses on complexity between a module and other modules.Coupling can be balanced between two extremes: tight coupling and loose coupling.If a module is too reliant on other modules, then it is “tightly coupled” to others.This is a bad design.If a module finds it easy to connect to other modules through well-defined interfaces, it is 'loosely coupled' to others. This is good design.In order to evaluate the coupling of a module, the metrics to consider are: degree,ease, and flexibility",
  "Cohesion focuses on complexity within a module, and represents the clarity of the responsibilities of a module.Like complexity, cohesion can work between two extremes: high cohesion and low cohesion.A module that performs one task and nothing else, or that has a clear purpose, has high cohesion. A good design has high cohesion, Boxes are used to represent a role played by an object. The role is typically named after the class for the object. Lifelines, which are vertical dotted lines, are used in the diagram to indicate an object as time goes by.Solid line arrows are used to show messages that are sent from one object to another, or a sender to a receiver.Receivers are at the pointed end of an arrow. A short description of the message is usually included above the arrow",
];