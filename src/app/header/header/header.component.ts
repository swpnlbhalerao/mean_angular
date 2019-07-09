import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements  OnInit, OnDestroy {
  isAuthenticated = false;
  userAuthSubscription: Subscription;

  constructor( private authService: AuthService) {

  }

  ngOnInit(): void {
      this.userAuthSubscription = this.authService.user.subscribe(
          user => {
              this.isAuthenticated = !!user;
          }
      )


  }

  logout(){
      this.authService.logout();
  }


  ngOnDestroy() {
      this.userAuthSubscription.unsubscribe();
  }






  /*   interval(1000).subscribe(
      count=>{
          console.log(count);
      }
  ) */
  /* const customObs=Observable.create(observer =>{
      let  count = -2
      setInterval(()=>{
        
          observer.next(count);
          observer.complete();
          observer.error(new Error("number is greater than 3 "))

          count++;
      },1000)

  })

 ;
 customObs.pipe(filter(data =>{
      return data>0;
 }),map((data:number)=>{
  return 'Round  '+data+1;
})) .subscribe((data:Data)=>{
     console.log(data);
 },error=>{
  console.log(error.message);
 },()=>{
     console.log("completed")
 })  */
}

