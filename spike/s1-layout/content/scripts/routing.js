var crossroads, hasher;

//setup crossroads
crossroads.addRoute('', function () {
    rootVM.activeTemplate('home/homeTemplate');
    alert("home");
});
crossroads.addRoute('profile/{id}', function (id) {
    rootVM.activeTemplate('profile/profileTemplate');
    alert("Profile:" + id);
});

//crossroads.routed.add(console.log, console); //log all routes
//setup hasher
function parseHash(newHash, oldHash) {
    crossroads.parse(newHash);
}
hasher.initialized.add(parseHash); //parse initial hash
hasher.changed.add(parseHash); //parse hash changes
hasher.init(); //start listening for history change

//update URL fragment generating new history record
hasher.setHash('');
