


pages/
└── About/
    ├── About.jsx
    ├── Hero.jsx
    ├── CompanyOverview.jsx
    ├── OurStory.jsx
    ├── MissionVision.jsx
    ├── CoreValues.jsx
    ├── Objectives.jsx
    ├── WhyOB39.jsx
    ├── Leadership.jsx
    ├── Timeline.jsx
    └── CallToAction.jsx

Now let's see what goes inside each one.

About.jsx

This is the main page.

import Hero from "./Hero";
import CompanyOverview from "./CompanyOverview";
import OurStory from "./OurStory";
import MissionVision from "./MissionVision";
import CoreValues from "./CoreValues";
import Objectives from "./Objectives";
import WhyOB39 from "./WhyOB39";
import Leadership from "./Leadership";
import Timeline from "./Timeline";
import CallToAction from "./CallToAction";

export default function About() {
  return (
    <>
      <Hero />
      <CompanyOverview />
      <OurStory />
      <MissionVision />
      <CoreValues />
      <Objectives />
      <WhyOB39 />
      <Leadership />
      <Timeline />
      <CallToAction />
    </>
  );
}

Notice that this file only assembles the page.

Hero.jsx

The page banner.

----------------------------------------

About OB39 Ltd

Building Sustainable Businesses
and Empowering African Farmers

----------------------------------------
CompanyOverview.jsx

Introduce the company.

Example content:

Who We Are

OB39 Ltd is a business empowerment platform
that supports businesses and farmers through:

• Business Financing

• Business Training

• Market Access

• Agricultural Development

• Export Facilitation

• Digital Marketplace

This content comes from the company overview in your document.

OurStory.jsx

Tell visitors why the company exists.

Our Story

OB39 Ltd was established to solve the
challenges faced by young businesses
and African farmers by creating a
sustainable empowerment ecosystem.
MissionVision.jsx

Display them side by side.

MISSION

To empower young businesses
and African farmers...

----------------------------

VISION

To become Africa's leading
business empowerment platform...
CoreValues.jsx

Instead of paragraphs,

show cards.

Integrity

Innovation

Empowerment

Collaboration

Excellence

Social Responsibility

These are taken directly from the document's core values section.

Objectives.jsx

Show the company's objectives.

Our Objectives

✔ Improve access to capital

✔ Support business growth

✔ Promote entrepreneurship

✔ Increase market access

✔ Encourage innovation

✔ Create employment
WhyOB39.jsx

Explain what makes the company different.

Why Choose OB39?

Integrated Business Support

Affordable Growth Capital

Professional Mentorship

Market Access

Technology Driven

Export Opportunities

This section reflects the document's emphasis on combining financing, training, networking, and market access into one platform.

Leadership.jsx

If the company has executives.

CEO

Finance Manager

Operations Manager

IT Manager

If you don't have this information yet,

you can leave this section out until later.

Timeline.jsx

Display milestones.

2026

Company Founded

↓

Project L

↓

Project OM

↓

Expansion Across Africa

You can add real milestones as the company grows.

CallToAction.jsx

Finish the page with a strong action.

Ready to Join OB39?

Become part of Africa's leading
business empowerment platform.

[Become a Member]

or

[Contact Us]
Final About Page
Hero

↓

Company Overview

↓

Our Story

↓

Mission & Vision

↓

Core Values

↓

Objectives

↓

Why OB39

↓

Leadership

↓

Timeline

↓

Call To Action
Which sections are reusable?

Some sections are specific to the About page, while others might be reused elsewhere.

src/
│
├── components/
│   ├── cards/
│   │   └── ValueCard.jsx
│   │
│   ├── ui/
│   │   └── SectionHeading.jsx
│   │
│   └── buttons/
│       └── PrimaryButton.jsx
│
└── pages/
    └── About/
        ├── About.jsx
        ├── Hero.jsx
        ├── CompanyOverview.jsx
        ├── OurStory.jsx
        ├── MissionVision.jsx
        ├── CoreValues.jsx
        ├── Objectives.jsx
        ├── WhyOB39.jsx
        ├── Leadership.jsx
        ├── Timeline.jsx
        └── CallToAction.jsx
One improvement I'd make

Since your document has two major focus areas—business empowerment (Project L Chapter A) and agriculture (Project L Chapter B)—I'd consider adding a section like:

Our Focus Areas

Business Empowerment

Agricultural Development

Digital Marketplace

Investment & Export