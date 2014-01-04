# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140104132735) do

  create_table "games", force: true do |t|
    t.integer  "number_of_rows"
    t.integer  "number_of_columns"
    t.integer  "number_of_pits"
    t.integer  "number_of_bats"
    t.integer  "number_of_arrows"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "cave"
    t.integer  "player_row"
    t.integer  "player_column"
    t.boolean  "treasure_found",    default: false
  end

  create_table "moves", force: true do |t|
    t.integer  "row"
    t.integer  "column"
    t.integer  "game_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
