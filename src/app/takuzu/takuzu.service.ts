import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TakuzuService {
  found = false;
  CasesSol = [];
  dimension :number =0;
  
  listPlateau : number[][][]=[
                              [[-1,1,-1,0],[-1,-1,0,-1],[-1,0,-1,-1],[1,1,-1,0]],
                              [[-1,-1,-1,-1,-1,-1,0,-1],[-1,0,-1,-1,-1,-1,0,-1],[-1,-1,-1,-1,0,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,0],[-1,-1,0,0,-1,-1,-1,0],[-1,-1,-1,-1,-1,-1,1,-1],[-1,0,0,-1,-1,-1,-1,-1],[-1,-1,-1,1,-1,0,0,-1]],
                              [[-1,0,0,-1,-1,-1,-1,-1],[-1,-1,1,1,-1,1,-1,-1],[1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,1,-1,-1],[-1,-1,-1,-1,1,1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,0],[-1,1,1,-1,-1,-1,-1,0],[-1,0,-1,-1,-1,-1,1,-1]],
                              [[0,-1,-1,0,-1,0,-1,-1],[-1,-1,0,-1,-1,-1,1,-1],[0,-1,-1,1,-1,-1,-1,-1],[-1,1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,0,-1,0,0,-1],[-1,-1,-1,-1,-1,-1,0,-1],[-1,0,0,-1,-1,-1,-1,1],[-1,-1,0,0,-1,0,0,-1]]
                             ] 
  plateau : number[][]= [];

  invalidCase: pair[] = [];

  constructor() { 
    this.generatePlateau();
  }

  init(){
    this.CasesSol = [];
    this.invalidCase = [];
  }

  generatePlateau(){
    this.invalidCase = [];
    this.plateau =[];
    let p = Math.floor(Math.random() * Math.floor(this.listPlateau.length));
    this.listPlateau[p].map( (l,i) => {
      this.plateau.push([])
      l.map((c,j)=>{
        this.plateau[i].push(c);
      })
      }
    )
    this.dimension = this.plateau.length;
  }

  changeCase(i,j){
    if(this.plateau[i][j]==1)this.plateau[i][j] = -1;
    else this.plateau[i][j] = this.plateau[i][j]+1; 
  }

  valid(){
    this.init();
    this.NoMoreTwo();
    this.NoSameV();
    this.NoSameH();
    this.MoreThanHalf();
    return this.invalidCase.length == 0;
  }

  MoreThanHalf(){
    this.plateau.map((l,i)=> {
        let listZero = [];
        let listUn = [];
        l.map( (c,j)=>{
          if(c==1) listUn.push({x:i,y:j})
          else if(c==0) listZero.push({x:i,y:j})
        })
        if(listZero.length>this.dimension/2) listZero.map( elt => this.invalidCase.push(elt))
        else if(listUn.length>this.dimension/2) listUn.map( elt => this.invalidCase.push(elt))

        listZero = [];
        listUn = [];

        l.map( (c,j)=>{
          if(this.plateau[j][i]==1) listUn.push({x:j,y:i})
          else if(this.plateau[j][i]==0) listZero.push({x:j,y:i})
        })

        if(listZero.length>this.dimension/2) listZero.map( elt => this.invalidCase.push(elt))
        else if(listUn.length>this.dimension/2) listUn.map( elt => this.invalidCase.push(elt))

    })
  }


  NoMoreTwo(){
    let temp =[];

    this.plateau.map( (l,i)=>{
      this.plateau[i].map( (c,j)=>{
        temp =[]
        if(c!=-1){
          let nbSame=0;
          let dx = j;
          while(dx>=0 && c== this.plateau[i][dx]){
            temp.push({x:i,y:dx});
            dx--;
            nbSame++;
          }
          dx = j+1;
          while(dx<this.dimension && c== this.plateau[i][dx]){
            temp.push({x:i,y:dx});
            dx++;
            nbSame++;
          }
          if(nbSame > 2){
            temp.map( elt => this.invalidCase.push(elt));
            return false;
          }else{
            temp=[];
          }
          temp=[];
          nbSame=0;
          let dy=i;
          while(dy>=0 && c== this.plateau[dy][j]){
            temp.push({x:dy,y:j});
            dy--;
            nbSame++;
          }
          dy = i+1;
          while(dy<this.dimension && c== this.plateau[dy][j]){
            temp.push({x:dy,y:j});
            dy++;
            nbSame++;
          }
          if(nbSame > 2){
            temp.map( elt => this.invalidCase.push(elt));
            return false;
          }else{
            temp=[];
          }
        }
      })
    })
        
    return true;
  }

  NoSameV(){
    let temp =[];

    this.plateau.map( (l,i)=>{
      temp =[];
      for(let j=i+1;j<this.plateau.length;j++){
        let nb=0;
        temp =[];
        for(let v=0;v<this.plateau.length;v++){
          if(this.plateau[v][i]!=-1 && this.plateau[v][i] == this.plateau[v][j]){
            temp.push({x:v,y:j});
            temp.push({x:v,y:i});
            nb++;
          }
        }
        if(nb >= this.plateau.length){
          temp.map( elt => this.invalidCase.push(elt));
          return false;
        }else{
          temp =[]
        }
      }
    })
    return true;
  }

  NoSameH(){
    let temp =[];

    this.plateau.map( (l,i)=>{
      temp =[];
      for(let j=i+1;j<this.plateau.length;j++){
        let nb=0;
        temp =[];
        for(let h=0;h<this.plateau.length;h++){
          if(this.plateau[i][h]!=-1 && this.plateau[i][h] == this.plateau[j][h]){
            temp.push({x:i,y:h});
            temp.push({x:j,y:h});
            nb++;
          }
        }
        if(nb >= this.plateau.length){
          temp.map( elt => this.invalidCase.push(elt));
          return false;
        }else{
          temp =[]
        }
      }
    })
    return true;
  }
  
  plateauComplet(){
    let res =true
    this.plateau.map( l => l.map( c => {
      if(c == -1){
        res = false;
        return
      }
    }))
    return res;
  }

  addTwo(){
    this.plateau.map((l,i)=> l.map((c,j)=>{
      if(c!=-1){
        if(0<=i-2 && this.plateau[i-2][j]==-1 && this.plateau[i-1][j]==this.plateau[i][j] ){
          this.plateau[i-2][j]=(this.plateau[i][j]+1)%2
          this.CasesSol.push({x:i-2,y:j})
        }
        if(i+2<this.dimension && this.plateau[i+2][j]==-1 && this.plateau[i+1][j]==this.plateau[i][j] ){
          this.plateau[i+2][j]=(this.plateau[i][j]+1)%2
          this.CasesSol.push({x:i+2,y:j})
        }
        if(j+2<this.dimension && this.plateau[i][j+2]==-1 && this.plateau[i][j+1]==this.plateau[i][j] ){
          this.plateau[i][j+2]=(this.plateau[i][j]+1)%2
          this.CasesSol.push({x:i,y:j+2})
        }
        if(0<=j-2 && this.plateau[i][j-2]==-1 && this.plateau[i][j-1]==this.plateau[i][j] ){
          this.plateau[i][j-2]=(this.plateau[i][j]+1)%2
          this.CasesSol.push({x:i,y:j-2})
        }

        if(0<=i-2 && this.plateau[i-1][j]==-1 && this.plateau[i-2][j]==this.plateau[i][j] ){
          this.plateau[i-1][j]=(this.plateau[i][j]+1)%2
          this.CasesSol.push({x:i-1,y:j})
        }
        if(i+2<this.dimension && this.plateau[i+1][j]==-1 && this.plateau[i+2][j]==this.plateau[i][j] ){
          this.plateau[i+1][j]=(this.plateau[i][j]+1)%2
          this.CasesSol.push({x:i+1,y:j})
        }
        if(j+2<this.dimension && this.plateau[i][j+1]==-1 && this.plateau[i][j+2]==this.plateau[i][j] ){
          this.plateau[i][j+1]=(this.plateau[i][j]+1)%2
          this.CasesSol.push({x:i,y:j+1})
        }
        if(0<=j-2 && this.plateau[i][j-1]==-1 && this.plateau[i][j-2]==this.plateau[i][j] ){
          this.plateau[i][j-1]=(this.plateau[i][j]+1)%2
          this.CasesSol.push({x:i,y:j-1})
        }
      }
    }))
  }

  addHalf(){
    this.plateau.map((l,i)=> {
      let listZero = [];
      let listUn = [];
      l.map( (c,j)=>{
        if(c==1) listUn.push({x:i,y:j})
        else if(c==0) listZero.push({x:i,y:j})
      })
      if(listZero.length==this.dimension/2) {
        l.map( (c,j)=>{ 
          if(this.plateau[i][j]==-1){
            this.plateau[i][j]=1; 
            this.CasesSol.push({x:i,y:j})
          }
      });
      }else if(listUn.length==this.dimension/2){
        l.map( (c,j)=>{ 
          if(this.plateau[i][j]==-1){
            this.plateau[i][j]=0; 
            this.CasesSol.push({x:i,y:j})
          }
      });
      }

      listZero = [];
      listUn = [];

      l.map( (c,j)=>{
        if(this.plateau[j][i]==1) listUn.push({x:j,y:i})
        else if(this.plateau[j][i]==0) listZero.push({x:j,y:i})
      })

      if(listZero.length==this.dimension/2) {
        l.map( (c,j)=>{ 
          if(this.plateau[j][i]==-1){
            this.plateau[j][i]=1; 
            this.CasesSol.push({x:j,y:i})
          }
      });
      }else if(listUn.length==this.dimension/2){
        l.map( (c,j)=>{ 
          if(this.plateau[j][i]==-1){
            this.plateau[j][i]=0; 
            this.CasesSol.push({x:j,y:i});
          }
      });
      }
    })
  }

  solve(){
    let a =0
    while(!this.plateauComplet() && a<250 ){
      a=a+1;
      this.addTwo();
      this.addHalf();
    }
    console.log(a);
    if(!this.plateauComplet() && a==250) {
      console.log('allllo');
      return 'il existe plusieurs solution!'
    }
    return ''
  }
}

export interface pair {
  x: number;
  y: number;
}