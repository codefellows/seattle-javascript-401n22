export function businessTrip(graph, itinerary) {
  let price = 0;

  // const edges = graph.get_edges(itinerary[0]);
  // return edges.find((edge) => edge.to === itinerary[1]).value.price;

  for (let i = 1; i < itinerary.length; i++) {
    let from = itinerary[i - 1];
    let to = itinerary[i];
    let edges = graph.get_edges(from);
    if (!edges) {
      return null;
    }
    let edge = edges.find((edge) => edge.to === to);
    if (edge) {
      price += edge.value.price;
    } else {
      return null;
    }
  }

  if (price === 0) {
    return null;
  }

  return price;
}
