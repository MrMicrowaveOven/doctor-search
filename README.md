# Doctor Persistence Cache

This is going to be a Node API that queries a separate "Search Doctor" API, and stores the results into an ElasticSearch Persistence Cache as well as returning them to the caller.

The idea is that if a call for an identical search is later called, rather than calling the "Search Doctor" API, it will return the same results as before from the ElasticSearch results.

## Using ElasticSearch for a Persistence Cache

To be honest, I don't think ElasticSearch is the best solution for this.  Here's why:

Let's say I make a search for doctors with the name Benjamin.  This API calls the "Search Doctor" API, it receives results, stores them in the ElasticSearch database, then returns the results to me.  Let's say then that I make a search for doctors with the name Ben.  If I search the ElasticSearch database, I'll get some results that were stored from the Benjamin search, but I still want to call the "Search Doctor" API (for those that would show up under "Ben", but not "Benjamin").

So thus, I can store my Doctor results using ElasticSearch, but I also need to store which Search Queries have been used.

In addition, to decide which results to return when given an identical search query, I can either:

1. Return the Doctor documents associated with that Search Query, using a database relation.
2. Search my database with ElasticSearch and hope that the API I'm calling uses the same ElasticSearch settings that I do.  Otherwise a "Ben" search might not return "Benjamin" when the "Search Doctor" API would have.  We would also need to replicate what order the results are in (information that I do not have), as well as
