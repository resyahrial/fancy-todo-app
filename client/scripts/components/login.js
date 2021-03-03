module.exports = () => {
  return `
    <div
      id="login-form"
      class="max-w-md bg-secondary mx-auto py-8 px-4 rounded-md shadow-md"
    >
      <h2 class="text-center text-2xl font-bold">Login Form</h2>
      <div class="w-full divide-solid bg-text my-4" style="height: 2px"></div>
      <form class="space-y-4 w-full">
        <div class="space-y-2">
          <label for="email">Email :</label><br />
          <input
            type="email"
            id="email"
            name="email"
            class="rounded w-full text-gray-800 px-3 py-2 focus:ring-offset-indigo-300 focus:ring-4"
            placeholder="type email"
          /><br />
        </div>
        <div>
          <label for="password">Password :</label><br />
          <input
            type="password"
            id="password"
            name="password"
            class="rounded w-full text-gray-800 px-3 py-2 focus:ring-offset-indigo-300 focus:ring-4"
            placeholder="type password"
          />
        </div>
        <button
          type="submit"
          class="bg-blue-600 rounded-md py-2 px-5 font-bold hover:bg-blue-800"
        >
          Login
        </button>
      </form>
    </div>
  `;
};
