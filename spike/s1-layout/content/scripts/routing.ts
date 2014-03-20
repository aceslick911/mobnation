var crossroads, hasher:any;
                                      
//setup crossroads
crossroads.addRoute('', ()=> {
    rootVM.activeTemplate('home/homeTemplate');
});
crossroads.addRoute('profile/{id}', (id: any) => {
    rootVM.activeTemplate('profile/profileTemplate');
    alert("Profile:"+ id);
});

//crossroads.routed.add(console.log, console); //log all routes
  
//setup hasher
function parseHash(newHash, oldHash){
  crossroads.parse(newHash);                       
}
hasher.initialized.add(parseHash); //parse initial hash
hasher.changed.add(parseHash); //parse hash changes
hasher.init(); //start listening for history change
 
//update URL fragment generating new history record
hasher.setHash('')