import { test } from "node:test";
import assert from "node:assert";

import { Graph } from "./graph.mjs";
import { businessTrip } from "./challenge.mjs";

test("One node graph", () => {
  const graph = new Graph();
  graph.add_node("Wakanda");

  const cost = businessTrip(graph, []);
  assert.equal(cost, null);
});

test("Two node graph, good itinerary", () => {
  const graph = new Graph();

  const zoltron = graph.add_node("Zoltron");
  const wakanda = graph.add_node("Wakanda");
  graph.add_undirected_edge(zoltron, wakanda, { price: 125 });

  const cost_one = businessTrip(graph, [zoltron, wakanda]);
  assert.equal(cost_one, 125);
});

test("Three node graph, good itinerary", () => {
  const graph = new Graph();

  const zoltron = graph.add_node("Zoltron");
  const wakanda = graph.add_node("Wakanda");
  const pandora = graph.add_node("Pandora");
  graph.add_undirected_edge(zoltron, pandora, { price: 75 });
  graph.add_undirected_edge(zoltron, wakanda, { price: 125 });

  const cost_one = businessTrip(graph, [zoltron, wakanda]);
  assert.equal(cost_one, 125);
});

test("Three node graph, many flights, good itinerary", () => {
  const graph = new Graph();

  const zoltron = graph.add_node("Zoltron");
  const wakanda = graph.add_node("Wakanda");
  const pandora = graph.add_node("Pandora");
  graph.add_undirected_edge(zoltron, pandora, { price: 75 });
  graph.add_undirected_edge(zoltron, wakanda, { price: 125 });

  const cost_one = businessTrip(graph, [pandora, zoltron, wakanda]);
  assert.equal(cost_one, 200);
});

test("Two node graph, bad itinerary", () => {
  const graph = new Graph();

  const zoltron = graph.add_node("Zoltron");
  const wakanda = graph.add_node("Wakanda");
  graph.add_undirected_edge(zoltron, wakanda, { price: 125 });

  const cost_two = businessTrip(graph, [zoltron, null]);
  assert.equal(cost_two, null);
});
