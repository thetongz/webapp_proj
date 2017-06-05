import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CosmeticService } from '../../services/cosmetic.service'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-cosmetic',
  templateUrl: './cosmetic.component.html',
  styleUrls: ['./cosmetic.component.css']
})
export class CosmeticComponent implements OnInit {
  category: string
  cosmetics = []
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cosmetic: CosmeticService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.category = params['category']
      this.cosmetic.getCosmeticByCategory(this.category).subscribe(data => {
        if (this.authService.getUser()) {
          this.authService.getWishlist().subscribe(wishlist => {
            for (var i = 0; i < data.length; i++) {
              var like = false
              for (var j = 0; j < wishlist.length; j++) {
                if (data[i].id == wishlist[j].id) {
                  like = true
                  break
                }
              }
              this.cosmetics.push({
                name: data[i].name,
                brand: data[i].brand,
                like: like,
                image: data[i].image,
                id: data[i].id
              })
            }
          })
        } else {
          this.cosmetics = data
        }
      })
    })
  }

  hover(e) {
    this.cosmetics[e.target.id].like = !this.cosmetics[e.target.id].like
  }

  addToWishlist(e) {
    this.cosmetic.addToWishlist(this.cosmetics[e.target.id].id, this.cosmetics[e.target.id].name).subscribe(data => {
      if (data.message == "success") {
        this.cosmetics[e.target.id].like = !this.cosmetics[e.target.id].like
      }
    })
  }

}
