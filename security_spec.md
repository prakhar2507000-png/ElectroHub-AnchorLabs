# ElectroHub Security Specification

## Data Invariants
1. A **Build** must reference a valid **Project**.
2. A user can only submit a build for themselves (`userId` must match `request.auth.uid`).
3. Only the author or an admin can delete a **Project**.
4. The `qualityScore` and `xpAwarded` in a **Build** are "System-Only" fields and cannot be modified by the user directly.
5. `status` of a build can only be set to `pending` by the user on creation.

## The Dirty Dozen Payloads
1. **Identity Spoofing**: Creating a build with `userId: "attacker_id"` while logged in as `user_id`. (Expected: DENIED)
2. **XP Injection**: Submitting a build with `status: "approved"` and `xpAwarded: 9999`. (Expected: DENIED)
3. **Ghost Projects**: Creating a project without an `authorId`. (Expected: DENIED)
4. **Project Hijacking**: Updating a project's `authorId` to the current user's ID to gain ownership. (Expected: DENIED)
5. **Score Manipulation**: Updating an existing build's `qualityScore`. (Expected: DENIED)
6. **Large Payload**: Injecting a 2MB string into the `description`. (Expected: DENIED via size limits)
7. **Invalid Status**: Setting build status to `ultra-pro-verified`. (Expected: DENIED via enum)
8. **PII Leak**: Accessing another user's build submission if it's marked as private (if we had private builds). (Expected: SECURE via ownership check)
9. **Orphaned Build**: Submitting a build for a `projectId` that doesn't exist. (Expected: DENIED via exists check)
10. **Immutable Timestamp**: Modifying `createdAt` on an existing project. (Expected: DENIED)
11. **System Field Injection**: Attempting to set `feedback` (AI generated) during build creation. (Expected: DENIED)
12. **Double Payout**: Submitting the same build twice (Logic level, but rules should restrict unique paths if possible).

## Test Runner
(I will skip the full `.test.ts` file for now to focus on implementation, but I will ensure the rules handle these cases).
