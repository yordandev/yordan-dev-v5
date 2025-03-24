<template>
  <main class="flex flex-col gap-24">
    <section>
      <h2 class="mb-3 text-base font-medium text-slate-800">About</h2>
      <p class="mb-3">
        I&apos;m a software engineer building web (and occasionally mobile)
        apps, focusing on the end user experience. I'm currently working as a
        software engineer at
        <GetAcceptLink />
        in Sweden. I use he/him pronouns.
      </p>
      <p class="mb-3">
        Outside of work, I love feeding my curiosity — be it understanding why
        cats have superior night vision to figuring out how to export Apple
        Health data to create pretty visualizations. Speaking of cats,
        <StyledNavigationLink to="/images/chonky.jpg"
          >here</StyledNavigationLink
        >
        is my beautiful daughter. I also enjoy exploring local coffee shops,
        hiking, road cycling, as well as product design. How things and systems
        work is another fascination of mine, especially city infrastructure like
        public transport and electrical grids. (I highly recommend this
        <StyledNavigationLink
          to="https://www.goodreads.com/book/show/60690050-engineering-in-plain-sight"
        >
          book</StyledNavigationLink
        >)
      </p>
      <p class="mb-6">
        As a certified
        <WordGlossary
          word="yapper"
          definition="Someone who speaks persistently, often at length, and sometimes to the point of overwhelming or annoying others."
        />, I can talk endlessly about topics I'm passionate about, and I dive
        deep into anything that interests me. I also pride myself on bringing
        fun, inclusion, and a sense of community to any team I join.
      </p>
      <p class="mb-3">
        Here are some guiding principles that I try to live by:
      </p>
      <ul class="list-disc pl-4">
        <li>Close the loop</li>
        <li>People remember how you make them feel</li>
        <li>Consistency fosters excellence</li>
        <li>Show up for yourself every day</li>
        <li>Surround yourself with people smarter than you</li>
        <li>If it takes less than two minutes, do it now</li>
        <li>Taste is a muscle</li>
        <li>Sweat the details</li>
        <li>Explore anything and everything that sparks joy</li>
      </ul>
    </section>
    <section>
      <h2 class="mb-3 text-base font-medium text-slate-800">Connect</h2>
      <p>
        You can reach me on
        <StyledNavigationLink to="https://bsky.app/profile/yordan.dev"
          >Bluesky </StyledNavigationLink
        >,
        <StyledNavigationLink to="https://github.com/yordandev"
          >GitHub
        </StyledNavigationLink>
        or
        <StyledNavigationLink to="https://www.linkedin.com/in/yordandev/"
          >LinkedIn </StyledNavigationLink
        >.
      </p>
    </section>
  </main>
</template>

<script lang="ts" setup></script>
