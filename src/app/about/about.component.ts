import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from "@angular/router";

@Component({
  moduleId: __filename,
  selector: 'home',
  directives: [ ...ROUTER_DIRECTIVES ],
  template: `
    <h1>About Me</h1>
    <h2>Short Intro</h2>
    <p>
      Well hello there, let me tell you about myself. I'm Mathijs Segers born and raised in the Southern part of the Netherlands.
      While I was slowly rolling into adulthood I realised I love working with computers, mostly software but also things like Visual design peaqued my interests.
      In the end I noticed that software was the part I showed most love for, hence at pretty early stage I went to work learning and writing code.
      For more about my Professional life I suggest you check out <a [routerLink]="[ '/skills-and-history' ]">my skills and history</a> or pay a visit to my <a  href="https://nl.linkedin.com/in/mathijs-segers-68479518" target="_blank">LinkedIn</a>.
    </p>
    <h2>Mr. Stroganoff</h2>
    <p class="cf">
      <a target="_blank" href="/assets/img/mr.stroganoff.christmas.beer.jpg">
        <img class="content-image" src="/assets/img/mr.stroganoff.christmas.beer.jpg" alt="Mr. Stroganoff Christmas Beer" />
      </a>
      Besides the name of our first cat, Mr. Stroganoff is the name of the home brewery me and my girlfriend run.
      We both experiment with recipes and my girlfriend spends time designing and drawing the labels.
      Currently there is not too much We've done but if you dig deep enough you can find some of our brews on <a href="https://untappd.com" target="_blank">Untappd</a>.
      <br/>
      <br/>
      In the picture you can see a batch of three different brews (our latest brew for now). 
      They were made for christmas and carry the names of the Three Kings (Hebrew). 
      Unfortunately Malgalath and Galgalath were a bit strong in flavoring (Myrrh & Smokey Pine).
    </p>
    <h2>Orval and Loki</h2>
    <p class="cf">
      <a target="_blank" href="/assets/img/orval.and.loki.jpg">
        <img class="content-image inverse" src="/assets/img/orval.and.loki.jpg" alt="Orval and Loki" />
      </a>
      Ok I know the cats are not me, but I just love to share pictures of cats and especially these two.
      Also a third paragraph fills up the page more nicely.
      <br />
      <br />
      Well Orval (Right) is our oldest cat, he was born in April 2014 somewhere in Russia.
      He was imported to the Netherlands because here he looks pretty special and in Russia he would have ended up as a street cat.
      Orval is curious about everything and ends up running into open appartments in our building.
      <br />
      <br />
      Loki (Left) is a bit younger he's from November 2014, Loki is a Ragdoll and his old servants couldn't serve his needs anymore.
      He's pretty noisy and even more cuddly as Orval, he is however scared of everything and when he can't see you his meowing starts.
    </p>
  `
})
export class About {
}
