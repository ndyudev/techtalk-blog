import { supabase } from "./supabase";

// ==================== USERS ====================
export const userService = {
  // Lấy tất cả users
  async getAll() {
    const { data, error } = await supabase.from("users").select("*");
    if (error) throw error;
    return data;
  },

  // Lấy user theo email
  async getByEmail(email) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  // Tạo user mới
  async create(user) {
    const { data, error } = await supabase
      .from("users")
      .insert([user])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Cập nhật user
  async update(id, updates) {
    const { data, error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Xóa user
  async delete(id) {
    const { error } = await supabase.from("users").delete().eq("id", id);
    if (error) throw error;
  },
};

// ==================== POSTS ====================
export const postService = {
  // Lấy tất cả posts
  async getAll() {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  // Lấy post theo ID
  async getById(id) {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  // Tạo post mới
  async create(post) {
    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          ...post,
          //   created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Cập nhật post
  async update(id, updates) {
    const { data, error } = await supabase
      .from("posts")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Xóa post
  async delete(id) {
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) throw error;
  },
};

// ==================== COMMENTS ====================
export const commentService = {
  // Lấy tất cả comments của 1 post
  async getByPostId(postId) {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  // Tạo comment mới
  async create(comment) {
    const { data, error } = await supabase
      .from("comments")
      .insert([
        {
          ...comment,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Xóa comment
  async delete(id) {
    const { error } = await supabase.from("comments").delete().eq("id", id);
    if (error) throw error;
  },
};
