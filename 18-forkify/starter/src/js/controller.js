import * as model from './model.js';
import recipeView from './views/recipeView.js';
//////////////////
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';
import pagenitonView from './views/pagenitonView';
import { async } from 'regenerator-runtime/runtime';
import { MODAL_CLOSE_SEC } from './config.js';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    //0. Update results view to mark selected search result
    resultView.update(model.getSearchResultsPage());

    //1. Loading recipe
    await model.loadRecipe(id);

    //2. Rendering recipe
    recipeView.render(model.state.recipe);

    //3 Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError(`controler ${err}`);
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();

    //1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //2) Load search result
    await model.loadSearchResult(query);

    //3) Render results
    // resultView.render(model.state.search.result)
    resultView.render(model.getSearchResultsPage());

    //4) Render intinial pagination buttons
    pagenitonView.render(model.state.search);
  } catch (err) {
    console.error(`controller ${err}`);
  }
};

const controlPagination = function (goToPage) {
  //1) Render NEW results
  resultView.render(model.getSearchResultsPage(goToPage));

  //2) Render NEW pagination buttons
  pagenitonView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  //Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
  console.log(model.state.recipe);
};

const controlAddBookmark = function () {
  //1. Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookMark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //2. Update recipe view
  recipeView.update(model.state.recipe);

  //3. Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //Show loadding spinner
    addRecipeView.renderSpinner()

    //Upload the new recipe data
    await model.uploadRecipe(newRecipe)
    console.log(model.state.recipe)

    //Render recipe
    recipeView.render(model.state.recipe)

    // Success message
    addRecipeView.renderMessage();

    //Render bookmark view
    bookmarksView.render(model.state.bookmarks)

    //Change ID in URL
    window.history.pushState(null,'',`#${model.state.recipe.id}`)

    //Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow()
    }, MODAL_CLOSE_SEC * 1000)
  } catch (err) {
    console.log(err)
    addRecipeView.renderError(err.message)
  }
}

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  pagenitonView.addHanderClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe)
};

init();
