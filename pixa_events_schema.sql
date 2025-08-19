create table if not exists users (
    id serial primary key,
    name text not null,
    email text unique not null,
    created_at timestamp default now()
);

-- Events table
create table if not exists events (
    id serial primary key,
    title text not null,
    description text,
    date date not null,
    city text,
    created_by int references Users(id) on delete cascade
);

-- RSVPs table
create table if not exists rsvps (
    id serial primary key,
    user_id int references Users(id) on delete cascade,
    event_id int references Events(id) on delete cascade,
    status text check (status in ('Yes', 'No', 'Maybe'))
);
