# ZeroAngular
Angular wrapper for Zero (sync library).

## Dependencies
- @rocicorp/zero (The Zero core)
- RxJs

## Add Zero as Provider

```typescript
import { Zero } from '@rocicorp/zero';
import { provideZero } from 'zero-angular/zero.service';
...
    provideZero(new Zero({ schema, server: 'http://localhost:4848', userID: 'anon' }))
...
```
## Inject Services and Use Query

```typescript

import { ZeroService } from 'zero-angular/zero.service';
import { QueryService } from 'zero-angular/query.service';

...
export class MessagesComponent implements OnInit  {
  ...
  // Inject Services via Constructor
  constructor(private zeroService: ZeroService<Schema>, private zeroQuery: QueryService) {}
  
  ngOnInit(): void {
    ths.fetchSync();
    this.fetchUsingQuerySubscription();
  }

  // Example Zero fetch for data that does not need live updates
  fetchSync(){
    this.users = this.zeroService.getZero().query.user.materialize("forever");
    this.mediums = this.zeroService.getZero().query.medium.materialize("forever");
    this.allMessages = this.zeroService.getZero().query.message.materialize("forever");
  }

  // Subscribe to Query data enabling realtime updates
  fetchUsingQuerySubscription(){
    // Build the Query using the ZeroService
    let query = this.zeroService.getZero()
    .query.message
    .related("medium").related("sender")
    .orderBy("timestamp", "desc")
    .limit(20);

    if (this.filterUser) {
      query = query.where("senderID", this.filterUser);
    }

    if (this.filterText) {
      query = query.where("body", "LIKE", `%${this.filterText}%`);
    }
    
    // Use the Query with the Query Service and Subscribe
    this.zeroQuery.useQuery(query).subscribe(([results, resultType]) => {
      console.log('Query Result:', results, resultType);
      this.displaymessages = results as DisplayMessage[];
    });
  }
  ...
}
...
```

# Contributing

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

```bash
ng test
```