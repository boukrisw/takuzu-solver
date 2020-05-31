import { Component } from '@angular/core';
import { TakuzuService } from './takuzu/takuzu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public dimensions: Array<number> = [2,4,6,8,10,12,14,16];
  help=false;

  constructor(public takuzu: TakuzuService) {
  }

  Solve(){
    this.help=false;
    this.takuzu.init();
    if(this.takuzu.valid()){
      this.takuzu.solve();
    }
  }

  getImg(i,j){
      let res = '../assets/resources/Images/';
      let no=false;

      res= res+this.takuzu.plateau[i][j];
      this.takuzu.invalidCase.map( elt => {
        if( elt.x==i && elt.y==j){
          no=true;
          return 
        }
      })
      if(no) return res+'No.png';
      
      no=false;
      this.takuzu.CasesSol.map( elt => {
        if( elt.x==i && elt.y==j){
          no=true;
          return ;
        }
      })
      if(no) return res+'Sol.png';
      return res+'.png';
  }

  click(i,j){
    this.takuzu.init();
    this.takuzu.changeCase(i,j);
    
  }
  
  getPlateau(){
    return this.takuzu.plateau;
  }

  changedim(e) {
    this.removeHelp();
    this.takuzu.init();
    this.takuzu.dimension= e.target.value;
    this.takuzu.plateau =[]
    for(let i=0;i<e.target.value;i++){
      this.takuzu.plateau.push([]);
      for(let j=0;j<e.target.value;j++){
        this.takuzu.plateau[i].push(-1);
      }
    }
  }

  Generate(){
    this.takuzu.init();
    this.help=false;
    return this.takuzu.generatePlateau();
  }

  needHelp(){
    this.help=true;
  }

  removeHelp(){
    this.help=false;
  }
  getHelp(){
    return this.help;
  }
  
}
