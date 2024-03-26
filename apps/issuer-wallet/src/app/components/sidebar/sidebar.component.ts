import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { NavLink } from '@models/sidebar/nav-link';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'stamp-sidebar',
  standalone: true,
  imports: [LucideAngularModule, RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  navlinks = input.required<NavLink[]>();
}
