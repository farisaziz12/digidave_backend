class CreateQueries < ActiveRecord::Migration[6.0]
  def change
    create_table :queries do |t|
      t.string :request
      t.string :response
      t.references :user, null: true, foreign_key: true

      t.timestamps
    end
  end
end
