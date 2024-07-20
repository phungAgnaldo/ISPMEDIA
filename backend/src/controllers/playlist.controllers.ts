import { CreatePlaylistDTO } from "./dtos";
import AppError from "../errors/appError";
import { DatabasePlaylist, DatabaseUser, Visibility } from "../database";

class PlaylistControllers {
  readonly databasePlaylist = new DatabasePlaylist();
  readonly databaseUser = new DatabaseUser();

  async create({ name, description, visibility, user_id }: CreatePlaylistDTO) {
    const userExists = await this.databaseUser.findByID(user_id);

    if (!userExists) {
      return new AppError("User Not Exists", 400);
    }

    if (!(visibility in Visibility)) {
      return new AppError("Invalid Visibility Type", 400);
    }
    const playlist = await this.databasePlaylist.create({
      name,
      description,
      visibility,
      user_id,
    });

    return playlist;
  }

  async addmidea(id: string, midea_id: string) {
    const playlistExists = await this.databasePlaylist.findById(id);

    if (!playlistExists) {
      return new AppError("Playlist Not Exists", 400);
    }

    const playlist = await this.databasePlaylist.addMidea(id, midea_id);

    return playlist;
  }

  async list() {
    return await this.databasePlaylist.list();
  }

  async findById(id: string) {
    return await this.databasePlaylist.findByAndMideas(id);
  }

  async delete(id: string) {
    return await this.databasePlaylist.delete(id);
  }

  async listByUser(id: string) {
    return await this.databasePlaylist.listByUser(id);
  }
}

export { PlaylistControllers };
