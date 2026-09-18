# Don’t build your app twice.

Click **“Send payment.”** Or type **“Pay the caterer $400.”**

Those should be two ways to use the same feature. The same payment rules. The same permission checks. The same receipt. The same notifications.

In our Home app, people can use screens and buttons or talk to **Ask**, our conversational assistant.

Our mistake was teaching those two interfaces separately.

Developers built the feature into the app. Then we wrote a separate explanation so the assistant would know what the feature did and how to use it. Change the feature, and someone had to remember to update both.

Eventually, the descriptions stopped agreeing.

**The assistant was working from a different understanding of the product than the product itself.**

## What went wrong

One treasury payment moved the money successfully. But its receipt ended up in a field that nothing else read. Neither party was notified.

The payment worked. The experience did not.

Elsewhere, the system tried to find an agent’s treasury by looking for a similar name. But we already had an explicit relationship connecting the agent to its treasury. The system was guessing something it could have looked up.

These were different bugs, but they exposed the same problem: different parts of our system had their own ideas about how a feature worked.

Our rule became:

**Define the feature once. Let the app and the assistant work from that same definition.**

## What that means in practice

Take “send a payment.”

The system needs to know who receives the money, how much to send, and which treasury to use. It must check permission before anything moves. Afterward, it needs a receipt and the appropriate notifications.

Those are not *button rules* or *chat rules*.

They are **payment rules**.

The button can collect the details through a form. Ask can collect them through a conversation. But both should use the same definition of the action underneath.

When we change the payment requirements, we should not have to remember every screen, prompt, tool description, and agent listing where we explained them.

We should change the shared definition and generate the relevant parts of those interfaces from it.

That does not mean automatically designing an entire app. It means not manually teaching every interface what the same action requires.

## Where the ontology and skills fit

The technical names can make this sound more complicated than the idea is.

Our **ontology** gives us a shared way to describe relationships: a person has an inbox; a team has members; an agent holds a treasury. Code and the assistant should use those relationships rather than invent their own shortcuts.

Our **skill definitions** describe the actions: what information an action needs, which permissions must be checked, and what should happen afterward.

We then assign those skills to the appropriate kinds of agents. A treasury agent and a team agent do not need the same set of actions.

Our build process uses those definitions to prepare what Ask can call, what Home can offer, and what an agent advertises to other agents.

**One set of definitions. Several ways to use it.**

## Knowing how is not permission

There is an important boundary here.

Teaching an assistant how to send a payment does **not** authorize it to send one.

The system still has to check the actual permission for the actual request. A skill description cannot substitute for that check.

And describing what *should* happen is not proof that it *did* happen.

“Every payment produces a receipt” is a requirement.

The actual receipt is evidence.

We keep those separate: **the definition guides the work; permission allows it; evidence shows what happened.**

## We are partway there

The shared definitions and generation process are working for the agent types we have built.

But nine areas of Home still have separately written connections that we are replacing. Our automated checks are not complete yet, either.

This is a migration, not a claim that we have finished.

The goal is straightforward:

**Adding a feature to the app should not create a second project called “teach the assistant about the feature.”**

The screen and the conversation should be two entrances to the same product.

**Question:** When you change a feature, how many places do you have to update before both your app and your assistant understand the change?

`#AIAgents #AgentSkills #Ontology #A2A #AgenticWeb`
