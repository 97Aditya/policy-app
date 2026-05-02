import { Component } from '@angular/core';
import { Policy } from '../models/policy';
import { PolicyService } from '../services/policy.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-policy-list',
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.scss'],
})
export class PolicyListComponent {
  policies: Policy[] = [];
  paginatedData: Policy[] = [];

  displayedColumns: string[] = ['id', 'name', 'number', 'amount', 'expiryDate'];

  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [];
  constructor(private service: PolicyService) {}

  ngOnInit(): void {
    this.service.getPolicies().subscribe((data: any) => {
      this.policies = data;
      this.generatePageSizes();
      this.updatePagination();
    });
  }

  updatePagination() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedData = this.policies.slice(start, end);
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagination();
  }

  generatePageSizes() {
    const total = this.policies.length;

    if (total <= 10) {
      this.pageSizeOptions = [total];
      return;
    }

    const step = 10;
    this.pageSizeOptions = [];

    for (let i = step; i < total; i += step) {
      this.pageSizeOptions.push(i);
    }

    this.pageSizeOptions.push(total);
  }
}
