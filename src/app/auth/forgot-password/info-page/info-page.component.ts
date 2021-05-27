import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-info-page",
  templateUrl: "./info-page.component.html",
  styleUrls: ["./info-page.component.scss"],
})
export class InfoPageComponent implements OnInit {
  data: string;
  @Output() forgotPassword = new EventEmitter<boolean>();

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.data = this.route.snapshot.paramMap.get("data");
  }

  resetPassword(): void {
    this.router.navigate(["/"]);
  }
}
