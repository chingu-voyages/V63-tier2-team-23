create type public.event_type as enum ('in_person', 'online');

create table public.events (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
    title text not null check (char_length(btrim(title)) > 0),
    description text not null check (char_length(btrim(description)) > 0),
    event_date date not null,
    start_time time not null,
    end_time time not null,
    event_type public.event_type not null,
    location text,
    meeting_link text,
    capacity integer check (capacity > 0),
    created_at timestamptz not null default now(),

    constraint events_location_matches_type check (
        (event_type = 'in_person'
            and location is not null and char_length(btrim(location)) > 0
            and meeting_link is null)
            or
        (event_type = 'online'
            and meeting_link is not null and char_length(btrim(meeting_link)) > 0
            and location is null)
        )
);

comment on column public.events.description is 'Used by the AI agent to write promos';

create index events_user_id_idx on public.events (user_id);

-- Row level security:
alter table public.events enable row level security;

create policy "Users can read their own events"
    on public.events for select to authenticated
    using ((select auth.uid()) = user_id);

create policy "Users can create their own events"
    on public.events for insert to authenticated
    with check ((select auth.uid()) = user_id);

create policy "Users can update their own events"
    on public.events for update to authenticated
    using ((select auth.uid()) = user_id)
    with check ((select auth.uid()) = user_id);

create policy "Users can delete their own events"
    on public.events for delete to authenticated
    using ((select auth.uid()) = user_id);




grant select, insert, update, delete on table public.events to authenticated, service_role;






