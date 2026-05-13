# Jalali date calendar for Directus

<img width="847" height="462" alt="Screenshot 1405-02-18 at 15 28 36" src="https://github.com/user-attachments/assets/f6932b48-1358-4a64-bdec-4cf243b12e68" />
<img width="847" height="564" alt="Screenshot 1405-02-18 at 15 28 59" src="https://github.com/user-attachments/assets/db6f046f-21b7-4f11-af3e-a89839d2e513" />
<img width="347" height="458" alt="Screenshot 1405-02-18 at 15 28 08" src="https://github.com/user-attachments/assets/efd53be3-afc9-49fe-b2b4-60d3b349cda7" />
<img width="348" height="459" alt="Screenshot 1405-02-18 at 15 27 58" src="https://github.com/user-attachments/assets/ea78df05-3a9f-4954-b52a-178e3096b836" />

## Known Issues:

Contributions are welcome.

- [x] interface/display options are not the same as directus built-in interface/display options
- [x] when you select date data model, selecting a day selects a day before because date is yyyy-mm-dd 00:00 and applying timezone while converting days from georgian to jalali makes date change
- [ ] maybe the extension is not sandboxed
- [x] in O2M and M2M relations, jalali date display is not showing up (no value is showing).. i think it's related to directus limit on display extensions (fixed for M2O; true O2M/M2M list display is a Directus platform limitation)
- [x] Translation not implemented

---

## Contributor Notes

### Extension Sandboxing

The extension is not currently using Directus's sandboxed extension API. Directus introduced sandboxed extensions as a security boundary to limit what extensions can access at runtime. Migrating to the sandboxed API would require a significant architectural rewrite of both the interface and display components. This is tracked as a future enhancement for a major version update.

For more context on Directus extension sandboxing, see the [Directus Extensions documentation](https://docs.directus.io/extensions/overview.html).

### Timezone Behavior for `timestamp` Fields

For `timestamp` type fields, values are currently stored as naive datetimes shifted to Tehran time rather than UTC. This is a known trade-off in the current implementation. A future version should emit UTC when saving `timestamp` fields and convert to Tehran time only for display.

