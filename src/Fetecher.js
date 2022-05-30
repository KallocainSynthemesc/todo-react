
export function saveUser(obj, callback) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: obj.name }),
  };

  fetch("/todo/resources/Intervenant", requestOptions)
    .then((response) => response.json())
    .then((data) => callback(data.id + "/Todos"));
}

export function fetchData(resourceAddress, callback) {
    fetch(resourceAddress)
    .then(response => {
      let json = response.json();
      return json
    })
    .then(data => {
      console.log(data);
      callback(data)
    })
}

export function saveTodo(obj, param, callback) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  };

  fetch('/todo/resources/Intervenant/'+param+'/Todo', requestOptions)
    .then((response) => response.json())
    .then((data) => callback(data));
}

export function updateTodo(obj, resourceAddress, callback, callbackParam) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  };

  fetch(resourceAddress, requestOptions)
    .then((response) => response.json())
    .then((data) => callback(callbackParam));
}


