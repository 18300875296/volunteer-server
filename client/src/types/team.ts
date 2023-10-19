interface TeamEntity {
  team_id: string;
  name: string;
  manager_name: string;
  manager_passport: string;
  manager_phone: number;
  manager_email: string;
  address: string;
  description: string;
  status: string;
  logo: string;
  peoples: number;
  read_count: number;
  create_at: Date;
  update_at: Date;
}
export type { TeamEntity };
